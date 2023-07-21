"use client";
import React, { useState } from "react";
import styles from "./Home.module.scss";
import { HiOutlineCube } from "react-icons/hi";
import { GiEagleHead } from "react-icons/gi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ResponsiveCalendar } from "@nivo/calendar";
// import { data } from "./data";
import { SiMailchimp } from "react-icons/si";
import { signOut } from "next-auth/react";

function Home({ combinedUsers, numGoogleUsers, numGithubUsers }) {
  // generate data to show on calendar

  function generateCalaendarItem(data) {
    const dailyCount = data.reduce((accumulator, currentItem) => {
      // Extract the date from the createdAt property
      const date = currentItem.createdAt.split("T")[0]; // Assuming createdAt is in ISO date format

      // If the date is not already present in the accumulator object, initialize it with a count of 1
      if (!accumulator[date]) {
        accumulator[date] = 1;
      } else {
        // If the date is already present, increment the count by 1
        accumulator[date]++;
      }
      return accumulator;
    }, {});

    // Convert the dailyCount object to an array of objects with the desired format
    const result = Object.entries(dailyCount).map(([day, value]) => ({
      day,
      value,
    }));

    return result;
  }

  const totalUsers=combinedUsers.length

//   get the data in the form val and day
const data = generateCalaendarItem(combinedUsers);
  // count users per year
  function countUsersForYear(currentYear) {
    const usersRegisteredInYear = combinedUsers.filter(
      (user) => new Date(user.createdAt).getFullYear() === currentYear
    );
    return usersRegisteredInYear.length;
  }

  // handle logout
  const handleLogout = async () => {
    await signOut("google", { callbackUrl: "http://localhost:3000/login" });
  };
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    // Perform any actions or data fetching for the selected year
  };

  const renderYearList = () => {
    const years = [];
    const startYear = currentYear - 4; // Calculate the start year based on the current year

    for (let year = startYear; year <= currentYear; year++) {
      years.push(
        <button
          key={year}
          onClick={() => handleYearClick(year)}
          className={styles.button}
          style={{
            fontWeight: year === selectedYear ? "bold" : "normal",
            backgroundColor: year == selectedYear ? "green" : "",
          }}
        >
          {year}
        </button>
      );
    }
    return years;
  };

  let users = countUsersForYear(selectedYear);

  return (
    <div className={styles.home}>
      <div className={styles.homeTop}>
        <div className={styles.top}>
          <HiOutlineCube className={styles.icon} />
          <p className={styles.path}>/dashboard/home</p>
        </div>
        <div className={styles.bottom}>
          <p>
            <GiEagleHead className={styles.icon} />
            Profile
          </p>
        </div>
      </div>
      <div className={styles.homeBottom}>
        <div className={styles.profile}>
          <div className={styles.profileTop}>
            <Image
              src={session?.user?.image}
              alt="profile picture"
              width={200}
              height={200}
              quality={100}
              className={styles.image}
            />
          </div>
          <div className={styles.profileBottom}>
            <div className={styles.desc}>
              <p className={styles.name}>
                {session?.user?.name} <span>👽</span>
              </p>
              <p className={styles.email}>
                <SiMailchimp /> {session?.user?.email}
              </p>
              <div className={styles.buttonGroup}>
                <p className={styles.editProfile}>Edit Profile</p>
                <p className={styles.signOut} onClick={handleLogout}>
                  Sign Out
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dash}>
          <div className={styles.desc}>
            <p className={styles.title}>
              {users} {users < 2 ? "user" : "users"} Registered in{" "}
              {selectedYear}
            </p>
          </div>
          <div className={styles.calendar}>
            <ResponsiveCalendar
              data={data}
              from={`${selectedYear}-01-01`}
              to={`${selectedYear}-12-31`}
              emptyColor="#272727"
              colors={["#0e4429", "#006d32", "#26a641", "#39d353"]}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              monthBorderColor="#1E1E1E"
              dayBorderWidth={1}
              dayBorderRadius={10}
              dayBorderColor="#1E1E1E"
              daySpacing={3}
              theme={{
                labels: {
                  text: {
                    fontWeight: 900,
                    fontSize: "1.3rem",
                    fill: "#ffffff",
                  },
                },
                tooltip: {
                  container: {
                    background: "#303030",
                    fontSize: 12,
                  },
                  basic: {},
                  chip: {},
                  table: {},
                  tableCell: {},
                  tableCellValue: {},
                },
              }}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "row",
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: "right-to-left",
                },
              ]}
            />

            <div className={styles.stats}>
              <div className={styles.github}>
                <p>Github Sign-ins: { numGithubUsers }</p>
              </div>
              <div className={styles.google}>
                <p>Google Sign-ins: { numGoogleUsers }</p>
              </div>
              <div className={styles.github}>
                <p>Total users: {totalUsers}</p>
              </div>
            </div>
          </div>
          <div className={styles.yearsButton}>
            <div className={styles.buttonCont}>{renderYearList()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
