exports = function getFormatData() {
    const NowDate = new Date();
    return JSON.stringify(`${NowDate.getFullYear()}-${NowDate.getMonth() + 1}-${NowDate.getDate()}`);
  }

