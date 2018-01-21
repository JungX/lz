package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.jpa.entity.BaseEntity;
import com.eucalypt.lz.commons.enums.DeviceTransactionStatus;
import com.eucalypt.lz.commons.enums.OrderType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "v_orders")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class OrderView extends BaseEntity<Long> {
	@Column(name = "C_USER_ID")
	private String userId;
	@Column(name = "C_AMOUNT")
	private BigDecimal amount = new BigDecimal(0);
	@Column(name = "C_TYPE")
	@Enumerated(EnumType.STRING)
	private OrderType type;
	@Column(name = "C_STATUS")
	@Enumerated(EnumType.STRING)
	private DeviceTransactionStatus status;

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

	public DeviceTransactionStatus getStatus() {
		return status;
	}

	public void setStatus(DeviceTransactionStatus status) {
		this.status = status;
	}
}
