package com.util.baidu;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.net.URLEncoder;
import java.util.List;

/**
 * 图像审核接口
 */
public class ImgCensor {

    private static String ImgCensor(String filePath, String accessToken) {
        // 请求url
        String url = "https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined";
        try {
            // 本地文件路径
            byte[] imgData = FileUtil.readFileByBytes(filePath);
            String imgStr = Base64Util.encode(imgData);
            String imgParam = URLEncoder.encode(imgStr, "UTF-8");

            String param = "image=" + imgParam;

            // 注意这里仅为了简化编码每一次请求都去获取access_token，线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
//            String accessToken = AuthService.getAuth();


            String result = HttpUtil.post(url, accessToken, param);
//            System.out.println(result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean ImgCensorUtil(String[] filePaths) {
        String accessToken = AuthService.getAuth();

        for (String filePath : filePaths) {
            String res = ImgCensor(filePath, accessToken);
            System.out.println(res);
            JSONObject obj = JSON.parseObject(res);
            String conclusion = obj.getString("conclusion");
            if (!conclusion.equals("合规") && !conclusion.equals("疑似")) {
                return false;
            }
        }
        return true;
    }
    public static boolean ImgCensorUtil(List<String> filePaths) {
        String accessToken = AuthService.getAuth();

        for (String filePath : filePaths) {
            String res = ImgCensor(filePath, accessToken);
            System.out.println(res);
            JSONObject obj = JSON.parseObject(res);
            String conclusion = obj.getString("conclusion");
            if (!conclusion.equals("合规") && !conclusion.equals("疑似")) {
                return false;
            }
        }
        return true;
    }

}