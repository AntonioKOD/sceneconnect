
interface ProfilePageProps {
    params: Promise<{id: string}>
}

export default async function ProfilePage({params}: ProfilePageProps) {
    const {id} = await params;

    if(!id){
        return <div>Not found</div>
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${id}`);
    if(res.ok){
        const {user} = await res.json();
        return <div>{user.username}</div>
    }
    const profile = await res.json();
    

    return (
        <div>
            <h1>Profile</h1>
            <p>{id}</p>
            <h2>{profile}</h2>
        </div>
    )
}