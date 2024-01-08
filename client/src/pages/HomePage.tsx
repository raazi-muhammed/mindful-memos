import NavBar from "@/components/layout/NavBar";
import CreateNewNote from "@/components/note/CreateNewNote";
import { trpc } from "@/lib/trpc";
import NoteCard from "@/components/note/NoteCard";
import { NoteType } from "@/types/types";
import Container from "@/components/layout/Container";
import Heading from "@/components/utils/Heading";
import Spinner from "@/components/utils/Spinner";

const HomePage = () => {
    const notesResponse = trpc.user.getNotes.useQuery();
    const notes = notesResponse.data as NoteType[];

    return (
        <div className="w-screen">
            <NavBar />
            <Container>
                <section className="flex justify-between my-4">
                    <Heading>Notes</Heading>
                    <CreateNewNote />
                </section>
                <Spinner className="py-36" loading={notesResponse.isLoading} />
                {notes ? (
                    <>
                        {notes.length > 0 ? (
                            <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {notes.map((note) => (
                                    <NoteCard key={note._id} note={note} />
                                ))}
                            </section>
                        ) : (
                            <p className="text-center mt-40">No Notes</p>
                        )}
                    </>
                ) : null}
            </Container>
        </div>
    );
};

export default HomePage;
