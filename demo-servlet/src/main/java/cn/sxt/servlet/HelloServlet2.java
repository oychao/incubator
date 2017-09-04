package cn.sxt.servlet;

import java.io.IOException;

import javax.servlet.GenericServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//Servlet实现方式之二，继承GenericServlet抽象类
public class HelloServlet2 extends GenericServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
		HttpServletRequest httpReq = (HttpServletRequest) req;
		HttpSession session = httpReq.getSession();
		session.setAttribute("username", "Jack");
		System.out.println("servlet2: service()");
		res.getWriter().append("from GenericServlet");
	}
}
