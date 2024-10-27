'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { MessageSquare, Video, Activity, FileText, Pill, Calendar as CalendarIcon, ClipboardList, Heart, Smartphone } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Appointment {
  id: number
  date: string
  doctor: string
  type: string
}

interface Medication {
  id: number
  name: string
  dosage: string
  frequency: string
  refillDate: string
}

interface HealthMetric {
  date: string
  heartRate: number
  bloodPressure: string
  weight: number
}

export default function PatientHealthPortal() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, date: '2024-03-20 10:00 AM', doctor: 'Dr. Smith', type: 'Check-up' },
    { id: 2, date: '2024-03-25 2:00 PM', doctor: 'Dr. Johnson', type: 'Follow-up' },
  ])

  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', refillDate: '2024-04-01' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', refillDate: '2024-03-25' },
  ])

  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { date: '2024-03-01', heartRate: 72, bloodPressure: '120/80', weight: 70 },
    { date: '2024-03-08', heartRate: 70, bloodPressure: '118/78', weight: 69.5 },
    { date: '2024-03-15', heartRate: 74, bloodPressure: '122/82', weight: 69 },
  ])

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patient Health Portal</h1>
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="Patient" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="health-tracker">Health Tracker</TabsTrigger>
          <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {appointments.map(appointment => (
                    <li key={appointment.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                      <Badge>{appointment.date}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medication Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medications.map(medication => (
                    <li key={medication.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{medication.name}</p>
                        <p className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</p>
                      </div>
                      <Badge variant="outline">Refill: {medication.refillDate}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Manage Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="check-up">Check-up</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="datetime-local" />
                  <Button>Schedule</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Your Appointments</h3>
                  {appointments.map(appointment => (
                    <Card key={appointment.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div>
                          <p className="font-semibold">{appointment.doctor}</p>
                          <p className="text-sm text-gray-500">{appointment.type}</p>
                          <p className="text-sm">{appointment.date}</p>
                        </div>
                        <Button variant="outline">Reschedule</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medication Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input placeholder="Medication name" />
                  <Input placeholder="Dosage" />
                  <Input placeholder="Frequency" />
                  <Input type="date" placeholder="Refill date" />
                  <Button>Add Medication</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Your Medications</h3>
                  {medications.map(medication => (
                    <Card key={medication.id}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div>
                          <p className="font-semibold">{medication.name}</p>
                          <p className="text-sm">{medication.dosage} - {medication.frequency}</p>
                          <p className="text-sm text-gray-500">Refill: {medication.refillDate}</p>
                        </div>
                        <Button variant="outline">Request Refill</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health-tracker">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input type="number" placeholder="Heart Rate" />
                  <Input placeholder="Blood Pressure" />
                  <Input type="number" placeholder="Weight" />
                  <Button>Log Metrics</Button>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={healthMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#8884d8" />
                      <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telemedicine">
          <Card>
            <CardHeader>
              <CardTitle>Telemedicine Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-40" variant="outline">
                  <div className="flex flex-col items-center">
                    <Video className="h-8 w-8 mb-2" />
                    Start Video Consultation
                  </div>
                </Button>
                <Button className="h-40" variant="outline">
                  <div className="flex flex-col items-center">
                    <MessageSquare className="h-8 w-8 mb-2" />
                    Message Your Doctor
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Medical Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input type="file" />
                  <Button>Upload Document</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Your Documents</h3>
                  {[
                    { name: 'Lab Results.pdf', date: '2024-03-15' },
                    { name: 'Prescription.pdf', date: '2024-03-10' },
                    { name: 'Medical History.pdf', date: '2024-02-28' },
                  ].map((doc, index) => (
                    <Card key={index}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex items-center">
                          <FileText className="h-6 w-6 mr-2" />
                          <div>
                            <p className="font-semibold">{doc.name}</p>
                            <p className="text-sm text-gray-500">Uploaded: {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="outline">View</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}