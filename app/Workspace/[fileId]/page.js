"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import Pdfviewer from '../_components/pdfviewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from '../_components/TextEditor';

function workspace() {
    const { fileId } = useParams(); 
    const [notes, setNotes] = useState(false);
    const getfile = useQuery(api.fileStorage.getfile, { fileId });
    const getnotes = useQuery(api.notes.Getnotes, { fileId });

    useEffect(() => {
        if (getnotes) {
            setNotes(getnotes);
        }
    }, [getnotes]);

    useEffect(() => {
        console.log(getfile);
    }, [getfile]);

    if (!getfile) {
        return <p className="text-center mt-10 font-bold text-black">Loading file...</p>;
    }

    return (
        <div className=" h-screen flex flex-col">
            <WorkspaceHeader fileName={getfile?.fileName} notes={notes} />

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 flex-grow overflow-hidden">
                {/* PDF Viewer */}
                <div className="bg-white shadow-md rounded-md p-3 h-full overflow-auto">
                    <Pdfviewer fileUrl={getfile?.fileUrl} />
                </div>

                {/* Text Editor */}
                <div className=" bg-gradient-to-b from-pink-50 via-white to-blue-100 shadow-md rounded-md p-3 sm:mr-6 h-full overflow-auto">
                    <TextEditor fileId={fileId} />
                </div>
            </div>
        </div>
    );
}

export default workspace;
