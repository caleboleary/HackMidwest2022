import nookies from 'nookies';
import redirect from 'nextjs-redirect'

export default function Pharmacy({profileId}) {
    if (!profileId) {
        return <p>Please visit the main page before attempting to visit the pharmacy.</p>
    }

    const Redirect = redirect(`https://pharmacy.forhaley.com?pouch-profile-id=${profileId}`)


    return <Redirect><p>Sending you to the pharmacy experience...</p></Redirect>
}

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)

    return { props: { profileId: cookies['pouch-profile-id'] } };
  }