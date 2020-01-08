# main.rb
RubyVM::InstructionSequence.compile_option = {
    tailcall_optimization: true,
    trace_instruction: false
}

require './exercises.rb'

puts factorial_tailrec(10)