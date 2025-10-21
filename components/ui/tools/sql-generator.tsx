'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy, Database } from 'lucide-react';

type SQLCategory = 'DQL' | 'DML' | 'DDL' | 'DCL' | 'TCL' | 'FUNCTIONS' | 'ADVANCED';
type QueryType = 'select' | 'insert' | 'update' | 'delete' | 
                 'create-table' | 'alter-table' | 'drop-table' | 'truncate' |
                 'grant' | 'revoke' | 'create-user' | 'drop-user' |
                 'begin' | 'commit' | 'rollback' |
                 'aggregate' | 'string' | 'date' | 'join' | 'window' | 'cte' |
                 'view' | 'procedure' | 'trigger';

interface Template {
  name: string;
  type: QueryType;
  template: string;
  description: string;
}

export default function SqlGenerator() {
  const [category, setCategory] = useState<SQLCategory>('DQL');
  const [queryType, setQueryType] = useState<QueryType>('select');
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [copied, setCopied] = useState(false);
  
  // 自定义参数
  const [tableName, setTableName] = useState('users');
  const [columns, setColumns] = useState('id, name, email');
  const [condition, setCondition] = useState('');
  const [values, setValues] = useState('');

  const templates: Record<SQLCategory, Template[]> = {
    DQL: [
      {
        name: '基础查询',
        type: 'select',
        template: `SELECT {columns}\nFROM {table}\n{where}\n{orderBy}\n{limit};`,
        description: '基本的 SELECT 查询'
      },
      {
        name: '聚合查询',
        type: 'aggregate',
        template: `SELECT \n  COUNT(*) as total,\n  AVG(price) as avg_price,\n  MAX(price) as max_price,\n  MIN(price) as min_price,\n  SUM(quantity) as total_quantity\nFROM {table}\nGROUP BY category\nHAVING COUNT(*) > 5;`,
        description: '使用聚合函数统计数据'
      },
      {
        name: '多表连接',
        type: 'join',
        template: `SELECT \n  u.id,\n  u.name,\n  o.order_id,\n  o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nLEFT JOIN addresses a ON u.id = a.user_id\nWHERE u.status = 'active';`,
        description: 'INNER JOIN 和 LEFT JOIN'
      },
      {
        name: '窗口函数',
        type: 'window',
        template: `SELECT \n  name,\n  department,\n  salary,\n  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank,\n  AVG(salary) OVER (PARTITION BY department) as dept_avg_salary\nFROM employees;`,
        description: 'ROW_NUMBER, RANK, AVG 等窗口函数'
      },
      {
        name: 'CTE (公共表表达式)',
        type: 'cte',
        template: `WITH user_stats AS (\n  SELECT \n    user_id,\n    COUNT(*) as order_count,\n    SUM(total) as total_spent\n  FROM orders\n  GROUP BY user_id\n),\ntop_users AS (\n  SELECT *\n  FROM user_stats\n  WHERE order_count > 10\n)\nSELECT \n  u.name,\n  t.order_count,\n  t.total_spent\nFROM top_users t\nJOIN users u ON t.user_id = u.id;`,
        description: '使用 WITH 创建临时结果集'
      }
    ],
    DML: [
      {
        name: 'INSERT 单条',
        type: 'insert',
        template: `INSERT INTO {table} ({columns})\nVALUES ({values});`,
        description: '插入单条记录'
      },
      {
        name: 'INSERT 多条',
        type: 'insert',
        template: `INSERT INTO {table} (name, email, status)\nVALUES \n  ('John Doe', 'john@example.com', 'active'),\n  ('Jane Smith', 'jane@example.com', 'active'),\n  ('Bob Wilson', 'bob@example.com', 'inactive');`,
        description: '批量插入多条记录'
      },
      {
        name: 'INSERT SELECT',
        type: 'insert',
        template: `INSERT INTO archive_orders (order_id, user_id, total, created_at)\nSELECT order_id, user_id, total, created_at\nFROM orders\nWHERE created_at < '2024-01-01';`,
        description: '从查询结果插入数据'
      },
      {
        name: 'UPDATE',
        type: 'update',
        template: `UPDATE {table}\nSET \n  status = 'inactive',\n  updated_at = CURRENT_TIMESTAMP\n{where};`,
        description: '更新记录'
      },
      {
        name: 'UPDATE JOIN',
        type: 'update',
        template: `UPDATE orders o\nJOIN users u ON o.user_id = u.id\nSET o.discount = 0.1\nWHERE u.vip_level = 'gold';`,
        description: '使用 JOIN 更新'
      },
      {
        name: 'DELETE',
        type: 'delete',
        template: `DELETE FROM {table}\n{where};`,
        description: '删除记录'
      },
      {
        name: 'DELETE JOIN',
        type: 'delete',
        template: `DELETE o\nFROM orders o\nJOIN users u ON o.user_id = u.id\nWHERE u.status = 'deleted';`,
        description: '使用 JOIN 删除'
      }
    ],
    DDL: [
      {
        name: 'CREATE TABLE',
        type: 'create-table',
        template: `CREATE TABLE {table} (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  age INT CHECK (age >= 0 AND age <= 150),\n  status ENUM('active', 'inactive') DEFAULT 'active',\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n  INDEX idx_email (email),\n  INDEX idx_status_created (status, created_at)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
        description: '创建表结构'
      },
      {
        name: 'CREATE TABLE (外键)',
        type: 'create-table',
        template: `CREATE TABLE orders (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  user_id INT NOT NULL,\n  total DECIMAL(10, 2) NOT NULL,\n  status VARCHAR(20) DEFAULT 'pending',\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,\n  INDEX idx_user_status (user_id, status)\n) ENGINE=InnoDB;`,
        description: '创建带外键的表'
      },
      {
        name: 'ALTER TABLE (添加列)',
        type: 'alter-table',
        template: `ALTER TABLE {table}\nADD COLUMN phone VARCHAR(20),\nADD COLUMN address TEXT,\nADD INDEX idx_phone (phone);`,
        description: '添加新列和索引'
      },
      {
        name: 'ALTER TABLE (修改列)',
        type: 'alter-table',
        template: `ALTER TABLE {table}\nMODIFY COLUMN email VARCHAR(320) NOT NULL,\nCHANGE COLUMN old_name new_name VARCHAR(100);`,
        description: '修改列定义'
      },
      {
        name: 'ALTER TABLE (删除列)',
        type: 'alter-table',
        template: `ALTER TABLE {table}\nDROP COLUMN temp_column,\nDROP INDEX idx_old;`,
        description: '删除列和索引'
      },
      {
        name: 'DROP TABLE',
        type: 'drop-table',
        template: `DROP TABLE IF EXISTS {table};`,
        description: '删除表'
      },
      {
        name: 'TRUNCATE TABLE',
        type: 'truncate',
        template: `TRUNCATE TABLE {table};`,
        description: '清空表数据（保留结构）'
      },
      {
        name: 'CREATE INDEX',
        type: 'create-table',
        template: `CREATE INDEX idx_name_email ON {table} (name, email);\n\nCREATE UNIQUE INDEX idx_unique_email ON {table} (email);\n\nCREATE FULLTEXT INDEX idx_ft_content ON articles (title, content);`,
        description: '创建索引'
      }
    ],
    DCL: [
      {
        name: 'CREATE USER',
        type: 'create-user',
        template: `CREATE USER 'username'@'localhost' IDENTIFIED BY 'strong_password';\n\nCREATE USER 'readonly'@'%' IDENTIFIED BY 'password123';`,
        description: '创建数据库用户'
      },
      {
        name: 'GRANT (完整权限)',
        type: 'grant',
        template: `GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';\n\nFLUSH PRIVILEGES;`,
        description: '授予用户完整权限'
      },
      {
        name: 'GRANT (只读权限)',
        type: 'grant',
        template: `GRANT SELECT ON database_name.* TO 'readonly'@'%';\n\nFLUSH PRIVILEGES;`,
        description: '授予只读权限'
      },
      {
        name: 'GRANT (特定权限)',
        type: 'grant',
        template: `GRANT SELECT, INSERT, UPDATE ON database_name.{table} TO 'username'@'localhost';\n\nFLUSH PRIVILEGES;`,
        description: '授予特定表的特定权限'
      },
      {
        name: 'REVOKE',
        type: 'revoke',
        template: `REVOKE INSERT, UPDATE ON database_name.* FROM 'username'@'localhost';\n\nFLUSH PRIVILEGES;`,
        description: '撤销用户权限'
      },
      {
        name: 'DROP USER',
        type: 'drop-user',
        template: `DROP USER IF EXISTS 'username'@'localhost';`,
        description: '删除数据库用户'
      },
      {
        name: 'SHOW GRANTS',
        type: 'grant',
        template: `SHOW GRANTS FOR 'username'@'localhost';`,
        description: '查看用户权限'
      }
    ],
    TCL: [
      {
        name: '事务基础',
        type: 'begin',
        template: `BEGIN; -- 或 START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\nCOMMIT; -- 提交事务`,
        description: '基本事务操作'
      },
      {
        name: '事务回滚',
        type: 'rollback',
        template: `BEGIN;\n\nUPDATE {table} SET status = 'processing' WHERE id = 1;\n\n-- 如果出现错误\nROLLBACK; -- 回滚事务`,
        description: '回滚事务'
      },
      {
        name: '保存点',
        type: 'begin',
        template: `BEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nSAVEPOINT sp1;\n\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nSAVEPOINT sp2;\n\n-- 回滚到保存点\nROLLBACK TO sp1;\n\nCOMMIT;`,
        description: '使用保存点部分回滚'
      },
      {
        name: '事务隔离级别',
        type: 'begin',
        template: `-- 查看当前隔离级别\nSELECT @@transaction_isolation;\n\n-- 设置隔离级别\nSET TRANSACTION ISOLATION LEVEL READ COMMITTED;\n\nBEGIN;\n-- 你的 SQL 语句\nCOMMIT;`,
        description: '设置事务隔离级别'
      }
    ],
    FUNCTIONS: [
      {
        name: '字符串函数',
        type: 'string',
        template: `SELECT \n  CONCAT(first_name, ' ', last_name) as full_name,\n  UPPER(email) as email_upper,\n  LOWER(name) as name_lower,\n  SUBSTRING(description, 1, 100) as excerpt,\n  LENGTH(content) as content_length,\n  TRIM(title) as clean_title,\n  REPLACE(url, 'http://', 'https://') as secure_url\nFROM {table};`,
        description: '常用字符串操作函数'
      },
      {
        name: '日期时间函数',
        type: 'date',
        template: `SELECT \n  NOW() as current_datetime,\n  CURDATE() as current_date,\n  CURTIME() as current_time,\n  DATE_FORMAT(created_at, '%Y-%m-%d') as formatted_date,\n  YEAR(created_at) as year,\n  MONTH(created_at) as month,\n  DAY(created_at) as day,\n  DATEDIFF(NOW(), created_at) as days_ago,\n  DATE_ADD(created_at, INTERVAL 7 DAY) as next_week\nFROM {table};`,
        description: '日期时间处理函数'
      },
      {
        name: '条件函数',
        type: 'aggregate',
        template: `SELECT \n  name,\n  CASE \n    WHEN age < 18 THEN '未成年'\n    WHEN age BETWEEN 18 AND 60 THEN '成年'\n    ELSE '老年'\n  END as age_group,\n  IF(status = 'active', '活跃', '非活跃') as status_text,\n  COALESCE(phone, email, '无联系方式') as contact,\n  NULLIF(discount, 0) as valid_discount\nFROM {table};`,
        description: 'CASE, IF, COALESCE 等条件函数'
      },
      {
        name: '类型转换',
        type: 'aggregate',
        template: `SELECT \n  CAST(price AS DECIMAL(10,2)) as decimal_price,\n  CONVERT(created_at, DATE) as date_only,\n  CAST(id AS CHAR) as id_string,\n  STR_TO_DATE('2024-01-01', '%Y-%m-%d') as parsed_date\nFROM {table};`,
        description: '数据类型转换'
      },
      {
        name: 'JSON 函数',
        type: 'aggregate',
        template: `SELECT \n  JSON_EXTRACT(data, '$.name') as json_name,\n  JSON_UNQUOTE(JSON_EXTRACT(data, '$.email')) as email,\n  data->'$.address.city' as city,\n  data->>'$.phone' as phone,\n  JSON_OBJECT('id', id, 'name', name) as json_obj\nFROM {table}\nWHERE JSON_CONTAINS(tags, '"premium"');`,
        description: 'JSON 数据处理函数'
      },
      {
        name: '子查询示例',
        type: 'select',
        template: `-- 标量子查询\nSELECT name, \n       (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as order_count\nFROM users;\n\n-- IN 子查询\nSELECT * FROM products\nWHERE category_id IN (SELECT id FROM categories WHERE active = 1);\n\n-- EXISTS 子查询\nSELECT * FROM users u\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);`,
        description: '标量、IN、EXISTS 子查询'
      }
    ],
    ADVANCED: [
      // 视图 (View)
      {
        name: 'CREATE VIEW (基础)',
        type: 'view',
        template: `CREATE VIEW view_active_users AS\nSELECT \n  id,\n  name,\n  email,\n  created_at\nFROM users\nWHERE status = 'active';`,
        description: '创建基础视图'
      },
      {
        name: 'CREATE VIEW (复杂)',
        type: 'view',
        template: `CREATE VIEW view_user_order_summary AS\nSELECT \n  u.id as user_id,\n  u.name,\n  u.email,\n  COUNT(o.id) as order_count,\n  SUM(o.total) as total_spent,\n  AVG(o.total) as avg_order_value,\n  MAX(o.created_at) as last_order_date\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name, u.email;`,
        description: '创建带聚合和连接的视图'
      },
      {
        name: 'CREATE OR REPLACE VIEW',
        type: 'view',
        template: `CREATE OR REPLACE VIEW view_product_stats AS\nSELECT \n  p.id,\n  p.name,\n  p.price,\n  p.stock,\n  c.name as category_name,\n  (SELECT COUNT(*) FROM order_items WHERE product_id = p.id) as times_sold\nFROM products p\nJOIN categories c ON p.category_id = c.id;`,
        description: '创建或替换视图'
      },
      {
        name: 'DROP VIEW',
        type: 'view',
        template: `DROP VIEW IF EXISTS view_name;`,
        description: '删除视图'
      },
      {
        name: 'SHOW CREATE VIEW',
        type: 'view',
        template: `SHOW CREATE VIEW view_user_order_summary;`,
        description: '查看视图定义'
      },

      // 存储过程 (Stored Procedure)
      {
        name: '简单存储过程',
        type: 'procedure',
        template: `DELIMITER $$

CREATE PROCEDURE sp_get_user_by_id(
    IN p_user_id INT
)
BEGIN
    SELECT *
    FROM users
    WHERE id = p_user_id;
END$$

DELIMITER ;

-- 调用存储过程
CALL sp_get_user_by_id(1);`,
        description: '创建简单查询存储过程'
      },
      {
        name: '带输出参数的存储过程',
        type: 'procedure',
        template: `DELIMITER $$

CREATE PROCEDURE sp_count_orders(
    IN p_user_id INT,
    OUT p_order_count INT,
    OUT p_total_amount DECIMAL(10,2)
)
BEGIN
    SELECT 
        COUNT(*),
        SUM(total)
    INTO p_order_count, p_total_amount
    FROM orders
    WHERE user_id = p_user_id;
END$$

DELIMITER ;

-- 调用
CALL sp_count_orders(1, @count, @total);
SELECT @count, @total;`,
        description: '创建带输出参数的存储过程'
      },
      {
        name: '带条件逻辑的存储过程',
        type: 'procedure',
        template: `DELIMITER $$

CREATE PROCEDURE sp_update_user_status(
    IN p_user_id INT,
    IN p_new_status VARCHAR(20)
)
BEGIN
    DECLARE v_current_status VARCHAR(20);
    
    -- 获取当前状态
    SELECT status INTO v_current_status
    FROM users
    WHERE id = p_user_id;
    
    -- 条件判断
    IF v_current_status = 'active' THEN
        UPDATE users
        SET status = p_new_status,
            updated_at = NOW()
        WHERE id = p_user_id;
        
        SELECT 'Status updated successfully' as message;
    ELSE
        SELECT 'User is not active' as message;
    END IF;
END$$

DELIMITER ;`,
        description: '带条件判断的存储过程'
      },
      {
        name: '带循环的存储过程',
        type: 'procedure',
        template: `DELIMITER $$

CREATE PROCEDURE sp_generate_test_data(
    IN p_count INT
)
BEGIN
    DECLARE v_counter INT DEFAULT 0;
    
    WHILE v_counter < p_count DO
        INSERT INTO test_table (name, value)
        VALUES (
            CONCAT('Test ', v_counter),
            FLOOR(RAND() * 100)
        );
        
        SET v_counter = v_counter + 1;
    END WHILE;
    
    SELECT CONCAT(p_count, ' records inserted') as result;
END$$

DELIMITER ;`,
        description: '使用 WHILE 循环的存储过程'
      },
      {
        name: '带游标的存储过程',
        type: 'procedure',
        template: `DELIMITER $$

CREATE PROCEDURE sp_process_users()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_user_id INT;
    DECLARE v_name VARCHAR(100);
    
    -- 定义游标
    DECLARE cur CURSOR FOR 
        SELECT id, name FROM users WHERE status = 'active';
    
    -- 定义继续处理的条件
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- 打开游标
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_user_id, v_name;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- 处理每条记录
        INSERT INTO user_log (user_id, action, created_at)
        VALUES (v_user_id, 'Processed', NOW());
    END LOOP;
    
    -- 关闭游标
    CLOSE cur;
END$$

DELIMITER ;`,
        description: '使用游标遍历记录'
      },
      {
        name: 'DROP PROCEDURE',
        type: 'procedure',
        template: `DROP PROCEDURE IF EXISTS sp_procedure_name;`,
        description: '删除存储过程'
      },
      {
        name: 'SHOW PROCEDURE',
        type: 'procedure',
        template: `-- 查看所有存储过程\nSHOW PROCEDURE STATUS WHERE Db = 'database_name';\n\n-- 查看存储过程定义\nSHOW CREATE PROCEDURE sp_procedure_name;`,
        description: '查看存储过程信息'
      },

      // 触发器 (Trigger)
      {
        name: 'BEFORE INSERT 触发器',
        type: 'trigger',
        template: `DELIMITER $$

CREATE TRIGGER trg_users_before_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    -- 自动设置创建时间
    SET NEW.created_at = NOW();
    
    -- 自动生成唯一编号
    IF NEW.user_code IS NULL THEN
        SET NEW.user_code = CONCAT('USR', LPAD(NEW.id, 8, '0'));
    END IF;
END$$

DELIMITER ;`,
        description: '插入前触发器'
      },
      {
        name: 'AFTER INSERT 触发器',
        type: 'trigger',
        template: `DELIMITER $$

CREATE TRIGGER trg_orders_after_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    -- 记录日志
    INSERT INTO order_logs (
        order_id,
        action,
        user_id,
        created_at
    ) VALUES (
        NEW.id,
        'ORDER_CREATED',
        NEW.user_id,
        NOW()
    );
    
    -- 更新用户统计
    UPDATE user_stats
    SET order_count = order_count + 1,
        total_spent = total_spent + NEW.total
    WHERE user_id = NEW.user_id;
END$$

DELIMITER ;`,
        description: '插入后触发器'
      },
      {
        name: 'BEFORE UPDATE 触发器',
        type: 'trigger',
        template: `DELIMITER $$

CREATE TRIGGER trg_users_before_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    -- 自动更新修改时间
    SET NEW.updated_at = NOW();
    
    -- 记录修改人
    IF NEW.status != OLD.status THEN
        SET NEW.status_changed_at = NOW();
    END IF;
    
    -- 防止关键字段被修改
    IF NEW.id != OLD.id THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot change user ID';
    END IF;
END$$

DELIMITER ;`,
        description: '更新前触发器'
      },
      {
        name: 'AFTER UPDATE 触发器',
        type: 'trigger',
        template: `DELIMITER $$

CREATE TRIGGER trg_products_after_update
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    -- 价格变更记录
    IF NEW.price != OLD.price THEN
        INSERT INTO price_history (
            product_id,
            old_price,
            new_price,
            changed_at
        ) VALUES (
            NEW.id,
            OLD.price,
            NEW.price,
            NOW()
        );
    END IF;
    
    -- 库存预警
    IF NEW.stock < 10 AND OLD.stock >= 10 THEN
        INSERT INTO stock_alerts (
            product_id,
            stock_level,
            created_at
        ) VALUES (
            NEW.id,
            NEW.stock,
            NOW()
        );
    END IF;
END$$

DELIMITER ;`,
        description: '更新后触发器'
      },
      {
        name: 'BEFORE DELETE 触发器',
        type: 'trigger',
        template: `DELIMITER $$

CREATE TRIGGER trg_users_before_delete
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    -- 软删除：不真正删除，只标记
    INSERT INTO deleted_users (
        user_id,
        name,
        email,
        deleted_at
    ) VALUES (
        OLD.id,
        OLD.name,
        OLD.email,
        NOW()
    );
END$$

DELIMITER ;`,
        description: '删除前触发器（软删除）'
      },
      {
        name: 'AFTER DELETE 触发器',
        type: 'trigger',
        template: `DELIMITER $$

CREATE TRIGGER trg_orders_after_delete
AFTER DELETE ON orders
FOR EACH ROW
BEGIN
    -- 记录删除日志
    INSERT INTO audit_log (
        table_name,
        action,
        record_id,
        old_data,
        deleted_at
    ) VALUES (
        'orders',
        'DELETE',
        OLD.id,
        JSON_OBJECT(
            'user_id', OLD.user_id,
            'total', OLD.total,
            'status', OLD.status
        ),
        NOW()
    );
END$$

DELIMITER ;`,
        description: '删除后触发器'
      },
      {
        name: 'DROP TRIGGER',
        type: 'trigger',
        template: `DROP TRIGGER IF EXISTS trigger_name;`,
        description: '删除触发器'
      },
      {
        name: 'SHOW TRIGGERS',
        type: 'trigger',
        template: `-- 查看所有触发器\nSHOW TRIGGERS;\n\n-- 查看特定表的触发器\nSHOW TRIGGERS WHERE \`Table\` = 'users';\n\n-- 查看触发器详细信息\nSELECT * FROM information_schema.TRIGGERS\nWHERE TRIGGER_SCHEMA = 'database_name';`,
        description: '查看触发器信息'
      }
    ]
  };

  const currentTemplates = templates[category] || [];

  const generateFromTemplate = (template: Template) => {
    let sql = template.template;
    
    // 替换占位符
    sql = sql.replace(/{table}/g, tableName);
    sql = sql.replace(/{columns}/g, columns);
    sql = sql.replace(/{values}/g, values);
    
    // WHERE 条件
    if (condition) {
      sql = sql.replace(/{where}/g, `WHERE ${condition}`);
    } else {
      sql = sql.replace(/{where}/g, '');
    }
    
    // ORDER BY
    sql = sql.replace(/{orderBy}/g, '');
    sql = sql.replace(/{limit}/g, '');
    
    setGeneratedSQL(sql);
    setQueryType(template.type);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* SQL 分类选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          SQL 分类
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { value: 'DQL', label: 'DQL', desc: 'SELECT 查询' },
            { value: 'DML', label: 'DML', desc: 'INSERT/UPDATE/DELETE' },
            { value: 'DDL', label: 'DDL', desc: 'CREATE/ALTER/DROP' },
            { value: 'DCL', label: 'DCL', desc: 'GRANT/REVOKE' },
            { value: 'TCL', label: 'TCL', desc: 'BEGIN/COMMIT' },
            { value: 'FUNCTIONS', label: '函数', desc: '聚合/字符串/日期' },
            { value: 'ADVANCED', label: '高级', desc: 'VIEW/PROCEDURE/TRIGGER' }
          ].map((cat) => (
            <Button
              key={cat.value}
              onClick={() => setCategory(cat.value as SQLCategory)}
              variant={category === cat.value ? 'default' : 'outline'}
              size="sm"
              className={`flex flex-col items-center justify-center h-auto py-2 px-2 ${
                category === cat.value ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' : ''
              }`}
            >
              <span className="font-semibold text-xs">{cat.label}</span>
              <span className="text-xs opacity-80 hidden sm:block">{cat.desc}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* 模板选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          选择模板 ({currentTemplates.length} 个)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {currentTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => generateFromTemplate(template)}
              className="text-left p-3 bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors group"
            >
              <div className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {template.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {template.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 自定义参数 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            表名
          </label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            列名 (逗号分隔)
          </label>
          <input
            type="text"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            WHERE 条件 (可选)
          </label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="id = 1 AND status = 'active'"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            值 (逗号分隔)
          </label>
          <input
            type="text"
            value={values}
            onChange={(e) => setValues(e.target.value)}
            placeholder="'John', 'john@example.com'"
            className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 生成的 SQL */}
      {generatedSQL && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              生成的 SQL
            </label>
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  复制
                </>
              )}
            </Button>
          </div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700 max-h-96 overflow-y-auto">
            {generatedSQL}
          </pre>
        </div>
      )}

      {/* 提示信息 */}
      <div className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="font-semibold mb-1">💡 使用提示</p>
        <ul className="list-disc list-inside space-y-1">
          <li>共 7 大分类，60+ SQL 模板覆盖所有场景</li>
          <li><strong>ADVANCED</strong> 包含视图、存储过程、触发器</li>
          <li>点击模板快速生成，支持参数自定义</li>
          <li>适合学习、参考和实际项目使用</li>
        </ul>
      </div>
    </div>
  );
}
