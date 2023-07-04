import Head from "next/head";
import { siteTitle } from "../components/layout";
import utilStyles from "../../styles/utils.module.css";

//get data from this APU endpoint https://dummyjson.com/users
export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/users/?limit=10');
    const users = await res.json();

    return {
        props: {
            users,
        },
    };
}

export default function Users( {users} ) {
    console.log(users);
    return (
        <>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <h1 className={utilStyles.heading2Lg}>Users</h1>
            <div>
                <table className={utilStyles.tableNew}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Address (Town)</th>
                            <th>Age</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.full_name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.address.city}</td>
                                <td>{user.age}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}