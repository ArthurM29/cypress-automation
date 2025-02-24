import {user} from "../data";
import {LoginPage} from "../pages/LoginPage";
import {LandingPage} from "../pages/LandingPage";
import {Header} from "../pages/Header";
import {MyAccountPage} from "../pages/MyAccountPage";

beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(user.email, user.password);
    LandingPage.shouldBeVisible();
    Header.visitMyAccount();
})


it('should be able to logout user', () => {
    MyAccountPage.logout();

    Header.visitMyAccount();
    LoginPage.shouldBeVisible();
}); 