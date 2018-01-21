package com.eucalypt.lz.commons.beans;

import com.eucalypt.framework.core.entity.ModuleRealm;
import com.eucalypt.lz.commons.enums.Roles;
import org.mongodb.morphia.annotations.Entity;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by zhaoyang on 17/3/28.
 */
@Entity("admin_users")
public class AdminUser extends BaseUser {
	private boolean master = false;
	private List<String> modules = new LinkedList<String>();
	private String comment;

	public AdminUser() {
		super(Roles.admin);
		setRealms(new ModuleRealm[]{ModuleRealm.ADMIN});
	}

	public boolean isMaster() {
		return master;
	}

	public void setMaster(boolean master) {
		this.master = master;
	}

	public List<String> getModules() {
		return modules;
	}

	public void setModules(List<String> modules) {
		this.modules = modules;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
}
