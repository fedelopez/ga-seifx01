require 'sqlite3'
require 'sinatra'
require 'sinatra/reloader'

get '/employees' do
  db = create_db
  @employees = db.execute('select * from employee')
  p @employees.size
  db.close
  erb :employees
end

get '/employees/:id' do
  id = params['id']
  db = create_db
  @employee = db.execute("select * from employee where id = #{id}").first
  db.close
  erb :employee
end

post '/employees/:id' do
  id = params['id']
  business_title = params['business_title']
  salary = params['salary']
  db = create_db
  db.execute("update employee set business_title = '#{business_title}', salary = #{salary} where id = #{id}")
  db.close
  redirect "/employees/#{id}"
end

get '/employees/edit/:id' do
  id = params['id']
  db = create_db
  @employee = db.execute("select * from employee where id = #{id}").first
  db.close
  erb :employee_edit
end

def create_db
  db = SQLite3::Database.new('crud.db')
  db.results_as_hash = true
  db
end
