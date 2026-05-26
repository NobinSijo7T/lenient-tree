import type { NextPage } from "next";
import GroupComponent from "../components/group-component";
import styles from "./sign-up-page.module.css";

const SignUpPage: NextPage = () => {
  return (
    <div className={styles.signUpPage}>
      <GroupComponent />
    </div>
  );
};

export default SignUpPage;
