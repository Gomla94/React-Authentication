import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./register.module.css";

import {
  faCheck,
  faTimes,
  faCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const userNameRef = useRef();
  const errorRef = useRef();

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validPasswordMatch, setValidPasswordMatch] = useState(false);
  const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGX.test(userName);
    console.log(result);
    console.log(userName);
    setValidUserName(result);
  }, [userName]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const matching = matchPassword === password;
    setValidPasswordMatch(matching);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [userName, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkuserName = USER_REGX.test(userName);
    const checkPassword = PASSWORD_REGEX.test(password);

    if (!checkuserName || !checkPassword) {
      setErrorMessage("Invalid input!");
      return;
    }

    setSuccess(true);
    return;
  };

  return (
    <div className={styles.registerFormWrapper}>
      <div className={styles.registerFormContainer}>
        <Fragment>
          {success ? (
            <section>
              <h1>Success Registeration</h1>
            </section>
          ) : (
            <section>
              <p
                className={errorMessage ? "errormsg" : "offscreen"}
                aria-live="assertiv"
              >
                {errorMessage}
              </p>
              <h1>Register</h1>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="username">
                    Username:
                    <span
                      className={
                        userName && validUserName ? styles.valid : styles.hide
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        !userName || validUserName
                          ? styles.hide
                          : styles.invalid
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    ref={userNameRef}
                    autoComplete="off"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                    onFocus={(e) => setUserNameFocus(true)}
                    onBlur={(e) => setUserNameFocus(false)}
                    aria-invalid={validUserName ? "false" : "true"}
                    aria-describedby="uidnote"
                  />
                  <p
                    id="uidnote"
                    className={
                      userName && !validUserName
                        ? styles.instructions
                        : styles.hide
                    }
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ paddingRight: "0.2rem" }}
                    />
                    4 to 24 characters. <br />
                    Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">
                    Password:
                    <span
                      className={
                        password && validPassword ? styles.valid : styles.hide
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        !password || validPassword
                          ? styles.hide
                          : styles.invalid
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="passwordnote"
                  />
                  <p
                    id="passwordnote"
                    className={
                      password && !validPassword
                        ? styles.instructions
                        : styles.hide
                    }
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ paddingRight: "0.2rem" }}
                    />
                    8 to 24 characters. <br />
                    Must contain uppercase and lowercase letters, a number and a
                    special character <br />
                    Allowed special characters:
                    <span aria-label="exclamation-mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                  </p>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">
                    Confirm Password:
                    <span
                      className={
                        matchPassword && validPasswordMatch
                          ? styles.valid
                          : styles.hide
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        !matchPassword || validPasswordMatch
                          ? styles.hide
                          : styles.invalid
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    onChange={(e) => setMatchPassword(e.target.value)}
                    onFocus={() => setPasswordMatchFocus(true)}
                    onBlur={() => setPasswordMatchFocus(false)}
                    aria-invalid={validPasswordMatch ? "false" : "true"}
                    aria-describedby="passwordmatchnote"
                  />
                  <p
                    id="passwordmatchnote"
                    className={
                      passwordMatchFocus && !validPasswordMatch
                        ? styles.instructions
                        : styles.hide
                    }
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ paddingRight: "0.2rem" }}
                    />
                    Password should be matching. <br />
                  </p>
                </div>

                <button
                  disabled={
                    !validUserName || !validPassword || !validPasswordMatch
                      ? true
                      : false
                  }
                >
                  Sign up
                </button>
              </form>
            </section>
          )}
        </Fragment>
      </div>
    </div>
  );
}
