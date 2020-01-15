require 'yaml'
require 'pp'

class Invoice
  attr_accessor :receipt, :date, :customer_first_name, :customer_last_name, :items
end

class Item
  attr_accessor :part_no, :description

  def initialize(part_no, description)
    @part_no = part_no
    @description = description
  end
end

cnf = YAML.load_file('invoice.yaml')
invoice = Invoice.new
invoice.receipt = cnf['receipt']
invoice.date = cnf['date']
invoice.customer_first_name = cnf['customer']['first_name']
invoice.customer_last_name = cnf['customer']['family_name']
invoice.items = cnf['items'].map { |item| Item.new(item['part_no'], item['descrip']) }

puts pp(invoice)