var fs = require("fs");
var gphoto2 = require("gphoto2");
var GPhoto = new gphoto2.GPhoto2();
var path = require("path");

// Import tiler
const createCollage = require('./tiler.js')

// Negative value or undefined will disable logging, levels 0-4 enable it.
GPhoto.setLogLevel(1);
GPhoto.on("log", function (level, domain, message) {
  console.log(domain, message);
});

// List cameras / assign list item to variable to use below options
GPhoto.list(async function (list) {
  if (list.length === 0) {
    console.log("No cameras connected");
    return;
  }
  var camera = list[0];
  console.log("Found", camera.model);

  // get configuration tree
  camera.getConfig(function (er, settings) {
    console.log(settings);
  });

  function takePicture() {
    return new Promise((resolve, reject) => {
      camera.takePicture(
        {
          download: true,
          keep: false
        },
        function (err, data) {
          if (err) {
            reject(err);
          }
          resolve(data);
        }
      );
    });
  }

  /**
   * Wait a given amount fo seconds
   * @param {number} seconds 
   */
  waitSeconds = seconds => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  };


  /**
   * Take a give number of pictures
   * @param {number} num 
   */
  async function takePictures(num) {
    for (var i = 0; i < num; i++) {
      var pic = await takePicture()
      console.log(`${i + 1} picture taken`);
      await this.waitSeconds(2)
      var dir = `${__dirname}/images/pic_${i + 1}.jpg`;
      fs.writeFileSync(dir, pic);
    }
  }


  await takePictures(3);

  var imagePaths = [path.resolve("./images/pic_1.jpg"), path.resolve("./images/pic_2.jpg"), path.resolve("./images/pic_3.jpg")];
  var brandImageUrl = path.resolve("./images/brand.jpg");
  var result = await createCollage(imagePaths, brandImageUrl);
});
