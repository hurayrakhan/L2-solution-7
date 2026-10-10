"use client";

import * as React from "react";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  FileText,
  UserCheck,
  CheckCircle,
  XCircle,
  Download,
  Search,
  Filter,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface ProviderVerification {
  id: string;
  name: string;
  email: string;
  phone: string;
  nidNumber: string;
  providerType: string;
  isVerified: boolean;
}

const PROVIDERS_DATA: ProviderVerification[] = [
  {
    id: "p-1",
    name: "Tariqul Islam",
    email: "owner@moveinbd.com",
    phone: "+880 1711-223344",
    nidNumber: "1992269201827364",
    providerType: "Property Owner",
    isVerified: true,
  },
  {
    id: "p-2",
    name: "Mizanur Rahman",
    email: "driver.mizan@gmail.com",
    phone: "+880 1812-345678",
    nidNumber: "1988261947291837",
    providerType: "Transport Fleet Driver",
    isVerified: false,
  },
  {
    id: "p-3",
    name: "Abdur Rashid",
    email: "rashid.truck@gmail.com",
    phone: "+880 1611-445566",
    nidNumber: "1985261947291845",
    providerType: "Transport Fleet Owner",
    isVerified: false,
  },
];

const AUDIT_LOGS = [
  {
    id: "log-1",
    action: "USER_REGISTERED",
    actor: "tenant@moveinbd.com",
    ip: "103.145.23.1",
    timestamp: "2026-03-10 14:22:15",
  },
  {
    id: "log-2",
    action: "PROPERTY_CREATED",
    actor: "owner@moveinbd.com",
    ip: "103.145.23.4",
    timestamp: "2026-03-10 15:05:40",
  },
  {
    id: "log-3",
    action: "ESCROW_PAYMENT_HELD",
    actor: "STRIPE_WEBHOOK",
    ip: "54.187.205.1",
    timestamp: "2026-03-10 16:10:02",
  },
  {
    id: "log-4",
    action: "PROVIDER_VERIFIED",
    actor: "admin@moveinbd.com",
    ip: "103.145.23.9",
    timestamp: "2026-03-10 17:35:19",
  },
];

export default function AdminReportsPage() {
  const [providers, setProviders] = React.useState<ProviderVerification[]>(PROVIDERS_DATA);

  const handleVerify = (id: string, approve: boolean) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVerified: approve } : p))
    );
    toast.success(approve ? "Provider National ID verified successfully!" : "Verification declined");
  };

  return (
    <DashboardLayout
      title="Compliance, Identity Verification & Audit Logs"
      subtitle="Ensure trust by reviewing National ID documentation and monitoring platform event history."
    >
      <div className="space-y-8">
        {/* Provider Verification Table */}
        <Card className="p-6 border-border">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Pending Provider Identity Verifications</CardTitle>
              <CardDescription className="text-xs">
                Review Bangladesh National ID numbers before granting Verified badges
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>NID Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-bold text-foreground">
                      {p.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="tonal-blue">{p.providerType}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs">
                      <div>{p.email}</div>
                      <div>{p.phone}</div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-foreground font-semibold">
                      {p.nidNumber}
                    </TableCell>
                    <TableCell>
                      {p.isVerified ? (
                        <StatusBadge status="VERIFIED" />
                      ) : (
                        <StatusBadge status="PENDING" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!p.isVerified ? (
                        <Button
                          size="xs"
                          variant="default"
                          onClick={() => handleVerify(p.id, true)}
                          leftIcon={<CheckCircle className="size-3" />}
                        >
                          Verify NID
                        </Button>
                      ) : (
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => handleVerify(p.id, false)}
                          className="text-red-500"
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card className="p-6 border-border">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base">System Audit Event Trail</CardTitle>
            <CardDescription className="text-xs">
              Immutable security logs recording all authentication, payments, and admin actions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Actor / Trigger</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AUDIT_LOGS.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <Badge variant="tonal-gray" className="font-mono font-bold text-[10px]">
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground text-xs">
                      {log.actor}
                    </TableCell>
                    <TableCell className="font-mono text-slate-500 text-xs">
                      {log.ip}
                    </TableCell>
                    <TableCell className="text-slate-400 text-xs">
                      {log.timestamp}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
