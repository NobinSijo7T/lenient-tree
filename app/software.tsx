import type { NextPage } from "next";
import Image from "next/image";
import Moving from "../components/moving";
import TT from "../components/t-t";
import FrameComponent from "../components/frame-component";
import Grid from "../components/grid";
import Container from "../components/container";
import styles from "./software.module.css";

const Software: NextPage = () => {
  return (
    <div className={styles.software}>
      <section className={styles.separatorParent}>
        <Image
          className={styles.separatorIcon}
          width={1440}
          height={1105}
          sizes="100vw"
          alt=""
          src="/Separator@2x.png"
        />
        <div className={styles.frameChild} />
      </section>
      <div className={styles.softwareChild} />
      <div className={styles.contentwidgetsproject} />
      <Image
        className={styles.softwareItem}
        width={1462.5}
        height={1462.5}
        sizes="100vw"
        alt=""
        src="/Group-15.svg"
      />
      <section className={styles.frameParent}>
        <Image
          className={styles.frameItem}
          width={982}
          height={982}
          sizes="100vw"
          alt=""
          src="/Group-17.svg"
        />
        <Image
          className={styles.robotIcon}
          loading="lazy"
          width={583}
          height={903.5}
          sizes="100vw"
          alt=""
          src="/robot@2x.png"
        />
      </section>
      <main className={styles.softwareInner}>
        <div className={styles.frameGroup}>
          <div className={styles.eventProgressParent}>
            <div className={styles.eventProgress}>
              <div className={styles.stacksprintHackathonParent}>
                <div className={styles.stacksprintHackathon}>
                  STACKSPRINT
                  <br />
                  HACKATHON
                </div>
                <div className={styles.r}>
                  <h2 className={styles.reactjs}>React.js</h2>
                </div>
                <div className={styles.e}>
                  <h2 className={styles.expressjs}>express.js</h2>
                </div>
                <div className={styles.m}>
                  <h2 className={styles.mongoDb}>Mongo DB</h2>
                </div>
                <div className={styles.dot} />
                <div className={styles.html}>
                  <h3 className={styles.javascript}>HTML</h3>
                </div>
                <div className={styles.tailwind}>
                  <h3 className={styles.tailwind2}>tailwind</h3>
                </div>
                <div className={styles.js}>
                  <h3 className={styles.javascript}>javascript</h3>
                </div>
                <div className={styles.python}>
                  <h3 className={styles.python2}>python</h3>
                </div>
                <div className={styles.css}>
                  <h3 className={styles.css2}>css</h3>
                </div>
              </div>
              <div className={styles.n}>
                <h2 className={styles.nodejs}>Node.js</h2>
              </div>
              <div className={styles.lenientTreeParent}>
                <h2 className={styles.lenientTree}>lenient tree</h2>
                <h2 className={styles.presents}>presents</h2>
              </div>
              <Moving property1="up" />
              <section className={styles.rectangleParent}>
                <div className={styles.frameInner} />
                <div className={styles.hoursParent}>
                  <h1 className={styles.hours}>24 hours</h1>
                  <h2 className={styles.june08}>June 08 - 09, 2026</h2>
                </div>
              </section>
              <TT property1="T1" state="Hero" />
            </div>
            <section className={styles.aboutSection}>
              <div className={styles.frameWrapper}>
                <div className={styles.frameContainer}>
                  <Image
                    className={styles.groupIcon}
                    loading="lazy"
                    width={583}
                    height={904}
                    sizes="(max-width: 640px) 64vw, 32vw"
                    alt=""
                    src="/robot@2x.png"
                  />
                  <div className={styles.frameDiv}>
                    <div className={styles.frameParent2}>
                      <div className={styles.aboutWrapper}>
                        <h3 className={styles.about}>About</h3>
                      </div>
                      <div className={styles.taskCompletion}>
                        <div className={styles.dotParent}>
                          <div className={styles.dot2} />
                          <h1 className={styles.stacksprintIsAContainer}>
                            <span className={styles.stacksprintIsAContainer2}>
                              <span className={styles.stacksprintIsA}>
                                StackSprint is a 24 hour intermediate level
                                hackathon focused on building end-to-end
                                software products.
                              </span>
                              <span className={styles.teamsMustDesign}>
                                Teams must design
                              </span>
                              <span className={styles.scalableArchitecturesAnd}>
                                scalable architectures and implement real
                                features like authentication, APIs, and
                                databases.
                              </span>
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className={styles.innovationDataWrapper}>
                <div className={styles.innovationData}>
                  <FrameComponent
                    hoursOfInnovation="24 Hours of Innovation"
                    workshopsMentorship={`Workshops &
Mentorship`}
                  />
                  <FrameComponent
                    hoursOfInnovation={`Learn Current
Trends & Tools`}
                    frameDivPadding="40px 0px"
                    workshopsMentorship={`& much more...`}
                    workshopsMentorshipMargin="0"
                    workshopsMentorshipFontWeight="400"
                  />
                </div>
              </section>
            </section>
          </div>
        </div>
      </main>
      <section className={styles.frameSection}>
        <div className={styles.gridParent}>
          <Grid />
          <Container />
          <div className={styles.madeWithFromLenientTreeWrapper}>
            <div
              className={styles.madeWith}
            >{`Made with ♥️ from Lenient tree `}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Software;
