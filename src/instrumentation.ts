export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const tracerLib = await import("dd-trace");
    const tracer = tracerLib.default;

    tracer.init({ logInjection: true, profiling: false });
    tracer.use("next");
  }
}
