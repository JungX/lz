CREATE OR REPLACE VIEW v_orders AS
  SELECT
    o.id                          AS id,
    o.C_CREATED_TIME,
    o.C_USER_ID,
    o.C_AMOUNT,
    o.C_TYPE,
    IFNULL(t.C_STATUS, 'unknown') AS C_STATUS,
    t.C_TRANSACTION_ID
  FROM t_orders o
    LEFT JOIN t_device_transactions t ON o.C_DEVICE_TRANSACTION_ID = t.C_TRANSACTION_ID