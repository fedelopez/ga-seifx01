update employee set salary = salary * 1.05
where salary = (select min(salary) from employee) ;