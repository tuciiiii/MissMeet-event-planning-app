
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Event title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().optional(),
  location: z.string().optional(),
  locationName: z.string().optional(),
  locationType: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateEventFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const CreateEventForm = ({ onSubmit, onCancel }: CreateEventFormProps) => {
  const { toast } = useToast();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      time: "",
      location: "",
      locationName: "",
      locationType: "cafe",
    },
  });

  const handleSubmit = (values: FormValues) => {
    toast({
      title: "Event created!",
      description: "Your event has been created successfully.",
    });
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Event Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Coffee at Aroma Café" 
                    className="girly-input" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Description (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add some details about the event..." 
                    className="rounded-xl resize-none border-girly-pink/30" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base">Date</FormLabel>
                  <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "girly-input pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "EEE, MMM d, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 text-girly-pink-dark opacity-70" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setDatePickerOpen(false);
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Time (optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-girly-pink-dark opacity-70" />
                      <Input 
                        placeholder="e.g., 3:00 PM" 
                        className="girly-input pl-9" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="locationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Place Name (optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-girly-pink-dark opacity-70" />
                    <Input 
                      placeholder="e.g., Aroma Café" 
                      className="girly-input pl-9" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Place Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="girly-input">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                      <SelectItem value="cinema">Cinema</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Address (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 123 Main St" 
                      className="girly-input" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="mr-2 border-girly-pink/30 text-girly-pink-dark hover:bg-girly-pink/10"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-gradient-to-r from-girly-pink to-girly-purple text-white hover:opacity-90"
          >
            Create Event
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEventForm;
