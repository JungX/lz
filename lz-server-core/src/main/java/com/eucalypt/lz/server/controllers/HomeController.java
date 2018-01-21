package com.eucalypt.lz.server.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class HomeController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/ad", method = RequestMethod.GET)
	public String ad() {
		return "ad";
	}

	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public void hello(HttpServletResponse response) throws IOException {
		PrintWriter writer = response.getWriter();
		writer.print("hello");
		writer.flush();
	}
}
