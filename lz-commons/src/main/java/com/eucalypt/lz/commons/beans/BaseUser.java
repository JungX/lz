package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.BasicUser;
import com.eucalypt.lz.commons.enums.UserStatus;
import org.mongodb.morphia.annotations.IndexOptions;
import org.mongodb.morphia.annotations.Indexed;

/**
 * Created by zhaoyang on 16/12/23.
 */
public class BaseUser extends BasicUser {

	@Indexed(options = @IndexOptions(unique = false))
	private UserStatus status = UserStatus.normal;

	public BaseUser(String role) {
		super(role);
	}

	public UserStatus getStatus() {
		return status;
	}

	public void setStatus(UserStatus status) {
		this.status = status;
	}
}
