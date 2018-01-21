package com.eucalypt.lz.commons.enums;

import java.math.BigDecimal;

public enum ProductType {
	TINY_MINS(15, new BigDecimal("0.01")),
	SMALL_MINS(30, new BigDecimal("0.01")),
	BIG_MINS(60, new BigDecimal("0.01")),
	PLEDGE(-1, new BigDecimal(6));

	private int mins;
	private BigDecimal amount;

	ProductType(int mins, BigDecimal amount) {
		this.mins = mins;
		this.amount = amount;
	}

	public int getMins() {
		return mins;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
}
