// NeuroLink AI: digital simulation ONLY. Not tested with a physical EEG circuit.
// Example: iverilog -g2012 -o /tmp/nlai_tb sample_register.sv tb_sample_register.sv
//          vvp /tmp/nlai_tb
`timescale 1ns/1ps
module tb_sample_register;
  reg clk = 0;
  always #5 clk = ~clk;
  reg rst_n = 0;
  reg [23:0] in_data = 0;
  reg in_valid = 0;
  wire in_ready;
  wire [23:0] out_data;
  wire out_valid;
  reg out_ready = 0;

  sample_register #(.WIDTH(24)) dut (
    .clk(clk), .rst_n(rst_n),
    .in_data(in_data), .in_valid(in_valid), .in_ready(in_ready),
    .out_data(out_data), .out_valid(out_valid), .out_ready(out_ready)
  );

  initial begin
    @(negedge clk);
    rst_n = 1;
    in_data = 24'h123456;
    in_valid = 1;
    @(posedge clk);
    #1;
    if (!out_valid || out_data !== 24'h123456)
      $fatal(1, "failed first sample");

    @(negedge clk);
    in_data = 24'hABCDEF;
    in_valid = 1;
    if (in_ready !== 1'b0) $fatal(1, "backpressure not asserted");
    @(posedge clk);
    #1;
    if (out_data !== 24'h123456)
      $fatal(1, "overwrote data under backpressure");

    @(negedge clk);
    out_ready = 1;
    @(posedge clk);
    #1;
    if (!out_valid || out_data !== 24'hABCDEF)
      $fatal(1, "failed second sample");

    @(negedge clk);
    in_valid = 0;
    @(posedge clk);
    #1;
    if (out_valid !== 0) $fatal(1, "valid did not clear");

    $display("PASS sample_register (synthetic digital data)");
    $finish;
  end
endmodule
