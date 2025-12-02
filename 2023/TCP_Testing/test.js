const fs = require("fs");
const upload_contents = fs.readFileSync("firmware.bin", { encoding: null });

const client = require("net");
let socket = client.connect(3232, "192.168.0.69", () => {
  console.log("Connected");
  const magicBytes = new Uint8Array([0x6c, 0x26, 0xf7, 0x5c, 0x45]);
  socket.write(magicBytes, null, () => {
    console.log("Magic bytes written");

    const UPLOAD_BLOCK_SIZE = 8192;
    let offset = 0;
    // while (true) {
    //   chunk = upload_contents.subarray(offset, offset + UPLOAD_BLOCK_SIZE);
    //   console.log(chunk);
    //   if (!chunk) break;
    //   offset += chunk.length;
    //   socket.write(chunk, null, () => {
    //     console.log("Bytes written");
    //   });
    // }
    socket.end("Update end", "utf8", (response) => {
      console.log(response);
    });

    // console.log("exited while function");
  });
});
