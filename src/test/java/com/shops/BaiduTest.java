package com.shops;

import com.util.baidu.AuthService;
import com.util.baidu.ImgCensor;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BaiduTest {
    @Test
    public void getBaiduAuth(){
        String token = AuthService.getAuth();
        System.out.println(token);
    }

    @Test
    public void ImgCensorTest(){
        String filePath = "C:\\Users\\seven\\Desktop\\pic-bed-tmp\\20210525130138.png";
        String filePath2 = "C:\\Users\\seven\\Desktop\\pic-bed-tmp\\QQ截图20210525130747.png";
        String fileMaybe = "C:\\Users\\seven\\Desktop\\TheInvisibleGuardian\\achievement_jiejuhongl.png";
        String fileOK = "C:\\Users\\seven\\Desktop\\TheInvisibleGuardian\\achievement_gurenl.png";

//        String re = ImgCensor.ImgCensor(filePath2);
        String[] files = {fileMaybe,fileOK,filePath,filePath2};
        System.out.println(ImgCensor.ImgCensorUtil(files));
    }

}
