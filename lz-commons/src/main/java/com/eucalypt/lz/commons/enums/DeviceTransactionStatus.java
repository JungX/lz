package com.eucalypt.lz.commons.enums;

public enum DeviceTransactionStatus {
	normalEnd, abnormalEnd, unknown;

	public static DeviceTransactionStatus parse(String status) {
		if (status == null) {
			return normalEnd;
		}
		return status.equals("0") ? abnormalEnd : normalEnd;
	}
}
