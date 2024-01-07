import NavBar from "@/components/layout/NavBar";
import CreateNewNote from "@/components/custom/CreateNewNote";
import { trpc } from "@/lib/trpc";
import NoteCard from "@/components/custom/NoteCard";
import { NoteType } from "@/types/types";

const HomePage = () => {
    const notesResponse = trpc.user.getNotes.useQuery();

    const notes = notesResponse.data as NoteType[];
    console.log(notesResponse);

    return (
        <div>
            <NavBar />
            <p>Home Page</p>
            <CreateNewNote />
            {notes ? (
                <section className="grid grid-cols-2">
                    {notes.map((note) => (
                        <NoteCard note={note} />
                    ))}
                </section>
            ) : null}
        </div>
    );
};

export default HomePage;
