exports.exports = function getFormatData() {
    const NowDate = new Date();
    console.log(NowDate)
    return JSON.stringify(`${NowDate.getFullYear()}-${NowDate.getMonth() + 1}-${NowDate.getDate()}`);
  }

