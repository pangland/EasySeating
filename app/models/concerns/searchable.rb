module Searchable
  extend ActiveSupport::Concern

  included do
    def self.time_data(data)
      s_time = Time.parse("#{data[:time]} -0500")
      preadjusted_date = s_time.to_date
      s_time = s_time.getlocal('-00:00')
      post_adjusted_date = s_time.to_date
      s_time = Time.parse(data[:date] + " " + s_time.to_s[11..-1])
      c_time = Time.now.getlocal('-00:00')
      offset_current = Slot.first.time.to_date + s_time.to_date
      offset_selected = s_time.to_date - Slot.first.time.to_date  - (post_adjusted_date - preadjusted_date)

      [s_time, c_time, offset_current, offset_selected]
    end
  end



  # module ClassMethods
  #   def search_conditions(data)
  #     debugger
  #     s_time, c_time, offset_current, offset_selected = time_data(data)
  #
  #     self.where('time > ?', c_time - offset_current.days)
  #       .where('time >= ?', s_time - offset_selected.days - 1.hours)
  #       .where('time <= ?', s_time - offset_selected.days + 1.hours)
  #       .where('seats = ?', data[:seats])
  #       .where('user_id IS NULL')
  #       .where('date = ?', data[:date].to_date)
  #   end
  # end
end
