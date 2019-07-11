let service = {};
service.getReports = function() {
  return new Promise((resolve, reject) => {
    resolve(reports);
  });
}
module.exports = service;
const reports = [
  {
    id: 1,
      master: "楊逍",
      image: "https://i.imgur.com/jcVBVrg.jpg",
      title: "字，有配套，你說的話沒有錯啊！",
      report: "同學一整學期沒有上過任何課，老師好我是網頁設計課的同學，在學期末之後，看似完美，老師好我是網頁設計課的同學，但從頭到尾那些網頁也不是他自己寫的，…感謝上師，感謝上師，感謝上師，…太好笑了，那麼該怎..."
  }, {
    id: 2,
      master: "范遙",
      image: "https://i.imgur.com/lnfiCvk.jpg",
      title: "這裡是戰場，耳朵啊！",
      report: "短暫的激情是不值錢的，跟60年代的人競爭，所有的創業者應該多花點時間，就是活著，關係特別不可靠，…還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！1DX，學運領袖 ..."
  }];
