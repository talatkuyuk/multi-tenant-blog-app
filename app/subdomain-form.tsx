"use client";

import type React from "react";
import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import { createSubdomainAction } from "@/app/actions";
import { rootDomain } from "@/lib/utils";
import styles from "./subdomain-form.module.css";

type CreateState = {
  error?: string;
  success?: boolean;
  subdomain?: string;
  icon?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className={styles.inputGroup}>
      <Label htmlFor="subdomain" className={styles.label}>
        Subdomain
      </Label>
      <div className={styles.subdomainField}>
        <Input
          id="subdomain"
          name="subdomain"
          placeholder="your-subdomain"
          defaultValue={defaultValue}
          className={styles.subdomainInput}
          required
        />
        <span className={styles.suffix}>.{rootDomain}</span>
      </div>
    </div>
  );
}

function IconPicker({
  icon,
  setIcon,
  defaultValue,
}: {
  icon: string;
  setIcon: (icon: string) => void;
  defaultValue?: string;
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleEmojiSelect = ({ emoji }: { emoji: string }) => {
    setIcon(emoji);
    setIsPickerOpen(false);
  };

  return (
    <div className={styles.inputGroup}>
      <Label htmlFor="icon" className={styles.label}>
        Icon
      </Label>
      <div className="flex flex-col gap-2">
        <input type="hidden" name="icon" value={icon} required />
        <div className="flex items-center gap-2">
          <Card className={styles.iconCard}>
            <div className={styles.icon}>
              {icon ? (
                <span className="text-3xl">{icon}</span>
              ) : (
                <span className={styles.emptyIcon}>No icon selected</span>
              )}
            </div>
            <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={styles.selectButton}
                  onClick={() => setIsPickerOpen(!isPickerOpen)}
                >
                  <Smile className="h-4 w-4 mr-2" />
                  Select Emoji
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={styles.emojiPopover}
                align="end"
                sideOffset={5}
              >
                <EmojiPicker
                  className={styles.emojiPicker}
                  defaultValue={defaultValue}
                  onEmojiSelect={handleEmojiSelect}
                >
                  <EmojiPickerSearch />
                  <EmojiPickerContent />
                  <EmojiPickerFooter />
                </EmojiPicker>
              </PopoverContent>
            </Popover>
          </Card>
        </div>
        <p className={styles.helperText}>
          Select an emoji to represent your subdomain
        </p>
      </div>
    </div>
  );
}

export function SubdomainForm() {
  const [icon, setIcon] = useState("");

  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createSubdomainAction,
    {}
  );

  return (
    <form action={action} className={styles.subdomainForm}>
      <SubdomainInput defaultValue={state?.subdomain} />
      <IconPicker icon={icon} setIcon={setIcon} defaultValue={state?.icon} />

      {state?.error && <div className={styles.errorText}>{state.error}</div>}

      <Button type="submit" disabled={isPending || !icon} className="w-full">
        {isPending ? "Creating..." : "Create Subdomain"}
      </Button>
    </form>
  );
}
