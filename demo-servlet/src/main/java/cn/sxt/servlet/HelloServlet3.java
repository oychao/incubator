package cn.sxt.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

//Servlet实现方式之一，继承HttpServlet类
public class HelloServlet3 extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("servlet3: service()");
		HttpSession session = req.getSession();
		System.out.println("servlet3: " + session.getAttribute("username"));
		session.invalidate();
		resp.getWriter().append("from HttpServlet");
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	}
}
