package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.jpa.entity.BaseEntity;
import com.eucalypt.lz.commons.enums.DeviceTransactionStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "t_device_transactions")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class DeviceTransaction extends BaseEntity<Long> {
	@Column(name = "C_DEVICE_ID")
	private String deviceId;
	@Column(name = "C_USER_ID")
	private String userId;
	@Column(name = "C_TRANSACTION_ID")
	private String deviceTransactionId;
	@Column(name = "C_STATUS")
	@Enumerated(EnumType.STRING)
	private DeviceTransactionStatus status;

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDeviceTransactionId() {
		return deviceTransactionId;
	}

	public void setDeviceTransactionId(String deviceTransactionId) {
		this.deviceTransactionId = deviceTransactionId;
	}

	public DeviceTransactionStatus getStatus() {
		return status;
	}

	public void setStatus(DeviceTransactionStatus status) {
		this.status = status;
	}
}
