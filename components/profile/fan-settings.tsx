"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface FanSettingsProps {
  user: {
    name: string
    email: string
  }
}

export function FanSettings({ user }: FanSettingsProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    notifications: true,
    newsletter: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement settings update logic here
    console.log("Updating settings:", formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fan Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch
              id="notifications"
              checked={formData.notifications}
              onCheckedChange={handleSwitchChange("notifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="newsletter">Newsletter</Label>
            <Switch id="newsletter" checked={formData.newsletter} onCheckedChange={handleSwitchChange("newsletter")} />
          </div>
          <Button type="submit" className="w-full">
            Update Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

