package cn.sxt.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class HelloFilter2 implements Filter {

    public HelloFilter2() {
    }

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		System.out.println("filter2: before servlet");
		chain.doFilter(request, response);
		System.out.println("filter2: after servlet");
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
