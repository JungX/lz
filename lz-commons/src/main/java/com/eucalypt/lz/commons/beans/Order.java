package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.jpa.entity.BaseEntity;
import com.eucalypt.lz.commons.enums.OrderStatus;
import com.eucalypt.lz.commons.enums.OrderType;
import com.eucalypt.lz.commons.enums.ProductType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.crypto.keygen.KeyGenerators;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "t_orders")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class Order extends BaseEntity<Long> {
	@Column(name = "C_USER_ID")
	private String userId;
	@Column(name = "C_AMOUNT")
	private BigDecimal amount = new BigDecimal(0);
	@Column(name = "C_TYPE")
	@Enumerated(EnumType.STRING)
	private OrderType type;
	@Column(name = "C_STATUS")
	@Enumerated(EnumType.STRING)
	private OrderStatus status = OrderStatus.unpaid;
	@Column(name = "C_PAY_DATE")
	private Date payDate;
	@Column(name = "C_LEVEL")
	private int level;
	@Column(name = "C_NUMBER")
	private String number;
	@Column(name = "C_TRANSACTION_ID")
	private String transactionId;
	@Column(name = "C_OPEN_ID")
	private String openId;
	@Column(name = "C_DEVICE_ID")
	private String deviceId;
	@Column(name = "C_MINS")
	private int mins;
	@Column(name = "C_PRODUCT_TYPE")
	@Enumerated(EnumType.STRING)
	private ProductType productType;
	@Column(name = "C_DEVICE_TRANSACTION_ID")
	private String deviceTransactionalId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public OrderType getType() {
		return type;
	}

	public void setType(OrderType type) {
		this.type = type;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Date getPayDate() {
		return payDate;
	}

	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public int getMins() {
		return mins;
	}

	public void setMins(int mins) {
		this.mins = mins;
	}

	public ProductType getProductType() {
		return productType;
	}

	public void setProductType(ProductType productType) {
		this.productType = productType;
	}

	public String getDeviceTransactionalId() {
		return deviceTransactionalId;
	}

	public void setDeviceTransactionalId(String deviceTransactionalId) {
		this.deviceTransactionalId = deviceTransactionalId;
	}

	@PrePersist
	protected void onCreate() {
		this.setNumber(KeyGenerators.string().generateKey().toUpperCase());
	}
}
