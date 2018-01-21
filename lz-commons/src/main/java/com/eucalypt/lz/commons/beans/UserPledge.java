package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.jpa.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "t_user_pledges")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class UserPledge extends BaseEntity<Long> {

	@Column(name = "C_USER_ID")
	private String userId;
	@Column(name = "C_AMOUNT")
	private BigDecimal amount = new BigDecimal(0);
	@Column(name = "C_OPEN_ID")
	private String openId;

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

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}
}
