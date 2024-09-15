import type { RequestHandler } from './$types';
import { redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals: { supabase }, url }) => {
    // try to get the code parameter
    const code = url.searchParams.get('code');
    if(code) {
        // exchange code for session id
        console.info("(/Auth route); Exchanging auth code for for session object.");
        console.debug(code);
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        // check for errors
        if(!error) {
            console.debug("No errors during auth, redirecting to /list...");
            redirect(302, '/list');
        } else {
            //TODO: Redirect to an error page
            console.error("Error appeared during auth:");
            console.error(error);
        }
    }
};
