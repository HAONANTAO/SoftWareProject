// 导入 Firebase 库中的兼容版本
import firebase from "firebase/compat/app";
// 导入 Firebase Storage 服务的兼容版本
import "firebase/compat/storage";

// Firebase 的配置信息
//（从firebase创建的项目的里面的应用找的，然后会有url和storage的imges里面找到“
const firebaseConfig = {
  apiKey: "AIzaSyB2k9OB8UJlK4lG29x-AeQLkVgRbqyilZQ",
  authDomain: "al-bluering.firebaseapp.com",
  projectId: "al-bluering",
  storageBucket: "al-bluering.appspot.com",
  messagingSenderId: "3192815893",
  appId: "1:3192815893:web:bac580a4047d0356aba91c",
  measurementId: "G-1RKNXQG3B3",
};

// 使用上面的配置信息初始化 Firebase 应用
firebase.initializeApp(firebaseConfig);

// 导出初始化后的 Firebase 实例，以便在其他文件中使用
export default firebase;
