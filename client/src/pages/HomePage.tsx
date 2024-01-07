import NavBar from "@/components/layout/NavBar";
import CreateNewNote from "@/components/custom/CreateNewNote";
import { trpc } from "@/lib/trpc";
import NoteCard from "@/components/custom/NoteCard";
import { NoteType } from "@/types/types";
import Container from "@/components/layout/Container";

const HomePage = () => {
    const notesResponse = trpc.user.getNotes.useQuery();

    const notes = notesResponse.data as NoteType[];
    console.log(notesResponse);

    return (
        <div className="w-screen">
            <NavBar />
            <Container>
                <section className="flex justify-between my-4">
                    <p className="text-xl mt-auto font-semibold">Notes</p>
                    <CreateNewNote />
                </section>
                {notes && notes.length > 0 ? (
                    <section className="grid grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NoteCard note={note} />
                        ))}
                    </section>
                ) : (
                    <p className="text-center mt-40">No Notes</p>
                )}
            </Container>
        </div>
    );
};

export default HomePage;
