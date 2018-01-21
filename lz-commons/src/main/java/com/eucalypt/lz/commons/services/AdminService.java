package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.entity.LoginBean;
import com.eucalypt.framework.core.entity.ModuleRealm;
import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.framework.core.entity.PagedResults;
import com.eucalypt.framework.core.exception.MessageException;
import com.eucalypt.framework.core.security.UserAuthenticationService;
import com.eucalypt.framework.core.service.AbstractUsersService;
import com.eucalypt.lz.commons.beans.AdminUser;
import org.mongodb.morphia.query.Query;

/**
 * Created by zhaoyang on 17/3/30.
 */
public class AdminService extends AbstractUsersService<AdminUser> implements UserAuthenticationService {

	private static final ModuleRealm[] realms = {ModuleRealm.ADMIN};

	@Override
	public Class<AdminUser> getEntityClass() {
		return AdminUser.class;
	}

	@Override
	public AdminUser auth(LoginBean loginBean) {
		return super.auth(loginBean.getUsername(), loginBean.getPassword(), loginBean.getRoles());
	}

	@Override
	public synchronized void modifyPassword(String username, String oldPassword, String newPassword) throws MessageException {
		super.modifyPassword(username, oldPassword, newPassword);
	}

	@Override
	public AdminUser loadUser(String id) {
		return get(id);
	}

	@Override
	public ModuleRealm[] getRealms() {
		return realms;
	}

	@Override
	public String create(AdminUser user) throws MessageException {
		return super.create(user);
	}

	@Override
	public String save(AdminUser entity) {
		return super.save(entity);
	}

	@Override
	public PagedResults<AdminUser> listPaged(PagedParam pagedParam) {
		Query<AdminUser> query = createQuery().field("master").equal(false);
		return super.listPaged(pagedParam, query);
	}

	@Override
	public void delete(String id) {
		super.delete(id);
	}

	@Override
	public AdminUser get(String id) {
		return super.get(id);
	}
}
