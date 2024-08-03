"use client"
import { useState } from 'react'
import Form from "@components/Form"
import Nav from '@components/Nav'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Creating = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        subject: '',
        media: '',
        description: '',
        location: '',
        date: '',
        time: '',
        color: ''
    })

    const CreateEvent = async (e) => {
        //TODO
        e.preventDefault();
        setSubmitting(true);

        try{
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    subject: post.subject,
                    media: post.media,
                    description: post.description,
                    location: post.location,
                    date: post.date,
                    time: post.time,
                    color: post.color
                })
            });

            if (response.ok){
                router.push("/");
            }
        }
        catch (error){
            console.log("Error occured" , error);
        }
        finally{
            setSubmitting(false);
        }
    };

    return (
        <>
            <Nav />
            <Form
            type="Publish"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={CreateEvent}
            />
        </>
    )
}

export default Creating