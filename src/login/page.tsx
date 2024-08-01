import Head from "next/head";
import LoginFormContainer from "../containers/LoginFormContainer";
import styles from "../styles/login.module.css"; // CSS dosyanızı import edin
import MockLoginFormContainer from "@/containers/MockLoginFormContainer";

export default function LoginPage() {
  return (
    <div className={styles["app-auth-sign-in"]}>
      <Head>
        <title>Wext.ai Questions Image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles["app-auth-background"]}></div>
      <div className={styles["app-auth-container"]}>
        <div className={styles.logo}>
          <a href="/">Wext.ai Questions Image</a>
        </div>
        <p className={styles["auth-description"]}>
          Please sign in to your account and continue to the dashboard.
        </p>
        <MockLoginFormContainer /*LoginFormContainer*/ />
      </div>
    </div>
  );
}
