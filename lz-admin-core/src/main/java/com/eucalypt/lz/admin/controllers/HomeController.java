package com.eucalypt.lz.admin.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class HomeController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "login";
	}

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
		return "test";
	}

	@RequestMapping(value = "/errorpage/unauth", method = RequestMethod.GET)
	public String errorPageUnauth() {
		return "unauth";
	}

	@RequestMapping(value = "/404", method = RequestMethod.GET)
	public String notFound(HttpServletRequest request) {
		return "404";
	}

	@RequestMapping(value = "/500", method = RequestMethod.GET)
	public String error(HttpServletRequest request) {
		return "500";
	}
}
