import React from 'react';
import { ScrollText } from 'lucide-react';

const EventLog = ({ events = [] }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-6">
            <h3 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
                <ScrollText className="w-5 h-5 mr-2" />
                Event Log
            </h3>
            
            <div className="max-h-48 overflow-y-auto space-y-2">
                {events.length === 0 ? (
                    <p className="text-gray-500 text-sm">No events yet...</p>
                ) : (
                    events.slice(-10).reverse().map((event, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-700 p-2 rounded text-sm"
                        >
                            <div className="flex justify-between items-start">
                                <span className="flex-1">{event.message}</span>
                                <span className="text-xs text-gray-400 ml-2">
                                    Week {event.week}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EventLog;